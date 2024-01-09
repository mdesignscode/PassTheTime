import { PrismaClient } from '@prisma/client'
import * as fs from 'fs';

const filePath = './data/poems.json';

const prisma = new PrismaClient()

async function getAuthors(): Promise<string[]> {
    const req = await fetch("https://poetrydb.org/author"),
        res = await req.json();

    return res.authors
}

async function getPoems(author: string): Promise<Record<string, any>[]> {
    const req = await fetch("https://poetrydb.org/author/" + author),
        res = await req.json();

    return res
}

async function getAuthorPoems(): Promise<Record<string, Record<string, any>[]>> {
    // get list of authors
    const authors = await getAuthors(),
        poems: Record<string, any> = {}

    // get poems for each author
    for (const author of authors) {
        const authorPoems = await getPoems(author),
            newList = authorPoems.map(poem => ({
                lines: poem.lines.join("\n"),
                title: poem.title
            }))
        poems[author] = newList.slice(0, 10)
    }

    return poems
}

async function main() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            const poems = JSON.parse(data);

            // get random list of authors
            const randomAuthors = shuffleArray(Object.keys(poems)),
                // sort the first 50 authors
                sortedAuthors = randomAuthors.slice(0, 50).sort()

            sortedAuthors.forEach(async (author) => {
                console.log(await prisma.author.create({
                    data: {
                        name: author,
                        poems: {
                            create: poems[author]
                        }
                    }
                }))
            })
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

function shuffleArray(array: string[]): string[] {
    const newArray = array.slice(); // Create a copy of the original array to avoid modifying it directly

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index within the remaining unshuffled portion

        // Swap elements at i and j
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }

    return newArray;
}
