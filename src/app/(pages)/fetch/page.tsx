// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

// type Repo = {
//   name: string;
//   stargazers_count: number;
// };

// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const repo: Repo = await res.json();
//   // Pass data to the page via props
//   return { props: { repo } };
// }) satisfies GetServerSideProps<{ repo: Repo }>;

// export default function Page({
//   repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <main>
//       <p>{repo.stargazers_count}</p>
//     </main>
//   );
// }

// export async function getServerSideProps() {
//     const res = await fetch(`https://api.github.com/repos/vercel/next.js`)
//     const projects = await res.json()

//     return { props: { projects } }
//   }

//   export default function Dashboard({ projects }) {
//     return (
//       <ul>
//         {projects.map((project) => (
//           <li key={project.id}>{project.name}</li>
//         ))}
//       </ul>
//     )
//   }

import React from "react";

const Page = () => {
  return <div>page</div>;
};

export default Page;
