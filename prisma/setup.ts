import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    fullName: 'Ed Putans',
    photoUrl:
      'https://media-exp1.licdn.com/dms/image/C4D03AQEpcAcgGSoS_Q/profile-displayphoto-shrink_200_200/0/1633355002274?e=1651708800&v=beta&t=5kLmtGlnua4sXCIXicrf8c4X4pbCiiyf4lE15V9ocIE',
    email: 'ed@gmail.com'
  },
  {
    fullName: 'Nicolas Marcora',
    photoUrl:
      'https://yt3.ggpht.com/ytc/AKedOLSVtp2X62YL_mv0uolsfxIFQA41wuE0tn-lI-aycw=s900-c-k-c0x00ffffff-no-rj',
    email: 'nicolas@gmail.com'
  },
  {
    fullName: 'Rinor Rama',
    photoUrl:
      'https://scontent.fprn1-1.fna.fbcdn.net/v/t1.6435-9/106620065_10213860914317337_8468048895594297740_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=P7lF1I-zcLIAX86IPPx&_nc_ht=scontent.fprn1-1.fna&oh=00_AT-suFqlYY9wJgt9dn-xgxx5bT3oNoMpGc6BtC8P8cdmgw&oe=624BDC9D',
    email: 'rinor@gmail.com'
  }
];

const hobbies = [
  {
    name: 'Coding',
    imageUrl:
      'https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png'
  },
  {
    name: 'Chess',
    imageUrl:
      'https://i.pinimg.com/736x/3c/4f/18/3c4f1886e5b1d47f3126703fd20f56b7.jpg'
  },
  {
    name: 'Anime',
    imageUrl:
      'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082010/anime.jpeg?itok=vk_ipHEd'
  }
];
const usersHobbies = [
  {
    userId: 1,
    hobbyId: 1,
    active: true
  },
  {
    userId: 2,
    hobbyId: 1,
    active: true
  },
  {
    userId: 1,
    hobbyId: 3,
    active: true
  },
  {
    userId: 1,
    hobbyId: 2,
    active: false
  },
  {
    userId: 2,
    hobbyId: 2,
    active: true
  },
  {
    userId: 2,
    hobbyId: 3,
    active: false
  },
  {
    userId: 3,
    hobbyId: 3,
    active: true
  }
];
async function createStuff() {
  for (const user of users) {
    await prisma.users.create({ data: user });
  }
  for (const hobby of hobbies) {
    await prisma.hobbies.create({ data: hobby });
  }
  for (const userHobby of usersHobbies) {
    await prisma.usersHobbies.create({ data: userHobby });
  }
}
createStuff();
