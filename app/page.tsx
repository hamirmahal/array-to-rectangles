"use client";
import React from "react";
export default function Home() {
  const [pairs, setPairs] = React.useState(exampleInput1);
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-around">
        <Rectangles pairs={pairs} />
      </div>
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]" />
      <textarea
        className="w-full h-48 p-4 text-lg bg-white border-2 border-gray-300 rounded-lg dark:bg-black dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        name="pairs"
        onChange={(e) => setPairs(e.target.value)}
        placeholder={`Enter an array of pairs like ${exampleInput1}. You can refresh the page to reset this input.`}
        value={pairs}
      />
    </main>
  );
}

const scalingFactor = 50;
const exampleInput1 = "[[1,3],[2,4],[3,2]]";
const exampleInput2 = "[[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]]";
function CustomError({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-red-500 font-bold text-2xl text-center">
      {children}
    </div>
  );
}
function Rectangles({ pairs }: Readonly<{ pairs: string }>) {
  let pairsArray: readonly [number, number][];
  try {
    pairsArray = JSON.parse(pairs);
  } catch (error) {
    return <CustomError>{`${error}`}</CustomError>;
  }
  for (const pair of pairsArray) {
    if (!Array.isArray(pair)) {
      return (
        <CustomError>
          Error: Expected an array, but got {typeof pair} for input{" "}
          {JSON.stringify(pair)}
        </CustomError>
      );
    }
    if (pair.length !== 2) {
      return (
        <CustomError>
          Error: Expected an array of length 2, but input {JSON.stringify(pair)}{" "}
          has length {pair.length}
        </CustomError>
      );
    }
    const [width, height] = pair;
    if (typeof width !== "number" || typeof height !== "number") {
      return (
        <CustomError>
          Error: Expected a pair of numbers, but got [{typeof width},{" "}
          {typeof height}] for input {JSON.stringify([width, height])}
        </CustomError>
      );
    }
  }
  return (
    <div className="flex flex-row items-end justify-evenly">
      {pairsArray.map(([width, height], index) => (
        <div
          key={index + 1}
          style={{
            height: height * scalingFactor,
            width: width * scalingFactor,
          }}
          className="bg-gradient-radial from-sky-200 to-blue-200 dark:from-sky-900 dark:to-[#0141ff] rounded-lg text-white font-bold text-3xl items-center justify-center shadow-lg flex"
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
