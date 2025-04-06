import { PrismaClient } from '@prisma/client'
import { players } from '../data/players'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.player.deleteMany({})

  // Seed players
  for (const player of players) {
    await prisma.player.create({
      data: {
        id: player.id,
        jerseyNumber: player.jerseyNumber,
        name: player.name,
        position: player.position || null,
        height: player.height,
        year: player.year,
        hometown: player.hometown,
        highSchoolOrPrevTeam: player.highSchoolOrPrevTeam,
        status: player.status,
        stats: player.stats || null,
        image: player.image || null,
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })