const { prisma } = require('./prismaClient');

async function shutdownPrisma() {
  try {
    console.log('Attempting to disconnect from database...');
    await prisma.$disconnect();
    console.log('Disconnected from database.');
  } catch (e) {
    console.error(e);
    console.log('Error occurred. Attempting to disconnect from database...');
    await prisma.$disconnect();
    console.log('Disconnected from database.');
    process.exit(1);
  }
}

exports.shutdownPrisma = shutdownPrisma;
