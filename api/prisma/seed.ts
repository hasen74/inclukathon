import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// hash and salt all 8 seed passwords
async function hash(password: string[]) {
  let hashed: string[] = ['', '', '', '', '', '', '', ''];
  const salt = await bcrypt.genSalt();
  for (let i = 0; i < password.length; i++) {
    hashed[i] = await bcrypt.hash(password[i], salt);
  }
  return hashed;
}

// seed Users & peopleGroups tables with sample data and encrypted passwords
async function seed(passToSeed: string[]) {
  await prisma.peopleGroup.createMany({
    data: [
      { name: 'admin' },
      { name: 'kiwi' },
      { name: 'fraise' },
      { name: 'banane' },
    ],
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: [
      {
        firstName: 'Assa',
        lastName: 'MENDY',
        gender: 'féminim',
        pronouns: 'elle/lui',
        email: 'admin@etna.io',
        password: passToSeed[0],
        disability: 'handicap moteur',
        role: 'ADMIN',
        description:
          "En cas de difficultés d'usage de la plateforme, envoyez moi un message.",
        peopleGroupId: 1,
      },
      {
        firstName: 'Fred',
        lastName: 'JOLLY',
        gender: 'masculin',
        pronouns: 'il/lui',
        email: 'fred@etna.io',
        password: passToSeed[1],
        disability: 'sourd',
        role: 'USER',
        description: 'heureux de participer au inclukathon !',
        peopleGroupId: 2,
      },
      {
        firstName: 'Emma',
        lastName: 'STONE',
        gender: 'non-binaire',
        pronouns: 'iel/accords féminims',
        email: 'emma@etna.io',
        password: passToSeed[2],
        disability: 'aucune',
        role: 'USER',
        description: 'super cet inclukathon !',
        peopleGroupId: 2,
      },
      {
        firstName: 'Ahmed',
        lastName: 'ABDALLAH',
        gender: 'masculin',
        pronouns: 'il/lui',
        email: 'ahmed@etna.io',
        password: passToSeed[3],
        disability: 'aveugle',
        role: 'COACH',
        description: 'prêt à coacher !',
        peopleGroupId: 2,
      },
      {
        firstName: 'Eric',
        lastName: 'DELACROIX',
        gender: 'masculin',
        pronouns: 'il/lui',
        email: 'eric@etna.io',
        password: passToSeed[4],
        disability: 'aveugle',
        role: 'USER',
        description: 'ravi de cette nouvelle expérience',
        peopleGroupId: 3,
      },
      {
        firstName: 'Emma-Laura',
        lastName: 'SOJKA',
        gender: 'féminin',
        pronouns: 'elle/lui',
        email: 'emmalaura@etna.io',
        password: passToSeed[5],
        disability: 'aucun',
        role: 'COACH',
        description: 'vive le inclukathon !',
        peopleGroupId: 3,
      },
      {
        firstName: 'Jade',
        lastName: 'MÜLLER',
        gender: 'non-binaire',
        pronouns: 'elle/lui',
        email: 'jade@etna.io',
        password: passToSeed[6],
        disability: "syndrome d'Asperger",
        role: 'USER',
        description: 'Prête à se challenger.',
        peopleGroupId: 4,
      },
      {
        firstName: 'Mehdi',
        lastName: 'MATTA',
        gender: 'masculin',
        pronouns: 'il/lui',
        email: 'mehdi@etna.io',
        password: passToSeed[7],
        disability: 'TDAH',
        role: 'COACH',
        description: 'A votre service pour toute question.',
        peopleGroupId: 4,
      },
    ],
    skipDuplicates: true,
  });
}

// joining function
async function main(passwords: string[]) {
  try {
    let hashedPasswords = await hash(passwords);
    await seed(hashedPasswords);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const passToHash: string[] = [
  'admin',
  'fred',
  'emma',
  'ahmed',
  'eric',
  'emmalaura',
  'jade',
  'mehdi',
];

// seed function call
main(passToHash);
