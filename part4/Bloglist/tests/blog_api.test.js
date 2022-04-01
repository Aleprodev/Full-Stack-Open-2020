const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
}, 30000)

describe('Return blogs', () => {
	test('Blogs are returned as JSON format', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 30000)
})

describe('Add new blogs', () => {
	test('A valid blog can be added', async () => {
		const newBlog = {
			title: 'New title',
			author: 'Ale',
			url: 'www.new.com',
			likes: 5000
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const newTitle = blogsAtEnd.map(blog => blog.title)
		expect(newTitle).toContain('New title')
	}, 30000)

	test('A blog without likes will have 0', async () => {
		const blogWithoutLikes = {
			title: 'New title',
			author: 'Ale',
			url: 'www.new.com',
		}

		const response = await api
			.post('/api/blogs')
			.send(blogWithoutLikes)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body.likes).toBe(0)
	}, 30000)
})

describe('Blogs forbidden', () => {
	test('Blog without tilte and url is not added', async () => {
		const wrongBlog = {
			author: 'Ale',
			likes: 1000
		}

		await api
			.post('/api/blogs')
			.send(wrongBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	}, 30000)
})

describe('Deletion of a blog', () => {
	test('Succeeds with status 204 if ID is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)
	})
})

describe('Update an existing note', () => {
	test('Update a blog', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blog = {
			title: 'NEW title to be deleted',
			author: 'Alejandro',
			url: 'www.url.com.ve',
			likes: 2000
		}

		const response = await api
			.put(`/api/blogs/${blogsAtStart[0].id}`)
			.send(blog)

		expect(response.body.id).toBe(blogsAtStart[0].id)
		
		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})