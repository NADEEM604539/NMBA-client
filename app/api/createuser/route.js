import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.data.email_addresses[0].email_address;
    const name = body.data.first_name;


    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    if (rows.length > 0) {
      console.log('Email already exists');
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    } else {
      await db.query(
        'INSERT INTO users (name, email, role_id) VALUES (?, ?, ?)',
        [name, email, 2]
      );
      console.log('User created successfully');
      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 201 }
      );
    }

  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
