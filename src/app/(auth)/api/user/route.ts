import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { email, username, password } = body

		//Check if email alredy exist
		const existingUserByEmail = await db.user.findUnique({
			where: { email: email }
		})
		if (existingUserByEmail) {
			return NextResponse.json(
				{ user: null, message: 'Email already exist' },
				{ status: 409 }
			)
		}

		//Check if  username alredy exist
		const existingUserByUsername = await db.user.findUnique({
			where: { username: username }
		})
		if (existingUserByUsername) {
			return NextResponse.json(
				{ user: null, message: 'Username already exist' },
				{ status: 409 }
			)
		}
		const newUser = await db.user.create({
			data: {
				username: username,
				email,
				password
			}
		})

		return NextResponse.json(body)
	} catch (error) {}
}
