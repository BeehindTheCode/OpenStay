import { desc } from 'drizzle-orm'
import { db } from '../db'
import { business } from './schemas/business'
import { user } from './schemas/user'

async function seed() {
  const users = await db.select().from(user)

  if (users.length === 0) {
    await db.insert(user).values({
      role: 'global.god',
      email: 'test@gmail.com',
      password: '16249809f34c1b88ce1bdeb3d392c7ab86f147bb', // Abc123456$
      fullName: 'John Wick',
      birthday: '12/12/1989',
      website: 'https://openstay.dev',
      code: '1234567890',
      active: false
    })

    const [userData] = await db.select().from(user).orderBy(desc(user.createdAt)).limit(1)

    await db.insert(business).values({
      userId: userData.id,
      name: 'Woodland Cabins',
      slug: 'woodland-cabins',
      email: 'test@gmail.com',
      phone: '+18052223333',
      priceRange: '$$',
      addressLine1: '3333 Regis Blvd',
      addressLine2: 'Apt 123',
      city: 'Denver',
      state: 'Colorado',
      country: 'USA',
      zipCode: '80221',
      googleMapsUrl:
        'https://www.google.com.mx/maps/place/Times+Square/@40.7579747,-73.9881175,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25855c6480299:0x55194ec5a1ae072e!8m2!3d40.7579747!4d-73.9855426!16zL20vMDdxZHI?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D',
      currency: 'USD',
      active: true
    })
  }

  console.log('Seed completed')

  process.exit()
}

seed()
