import { useMemo } from "react";
import FruitButton from "./Components/FruitButton";
import { PrismaClient } from "@prisma/client";
import { FruitProvider } from "./Components/context";
import FruitInfo from "./Components/FruitInfo";

export default async function Page() {
  const prisma = useMemo(() => new PrismaClient(), []);
  const fruits = await prisma.fruit.findMany({
    include: {
      nutritions: true,
    },
  });
  return (
    <FruitProvider>
      <main className="flex flex-col gap-4 h-full items-center justify-center">
        <p className="text-lg text-center w-8/12 md:text-xl">
          Dive into a fruity adventure like never before as we unravel the
          secrets of nature&#39;s sweet treasures. From the juicy sweetness of
          tropical pineapples to the crisp crunch of apples, we&#39;ve got a
          fruit for every palate.
        </p>

        <section className="flex gap-4 flex-wrap w-10/12 mx-auto items-center justify-center overflow-y-auto p-4 md:overflow-y-hidden md:flex-none flex-1">
          {fruits.map((fruit) => (
            <FruitButton key={fruit.id} fruit={{ ...fruit }} />
          ))}
        </section>

        <FruitInfo />
      </main>
    </FruitProvider>
  );
}
