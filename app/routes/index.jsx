import { TextLoop } from "react-text-loop-next";
import { motion } from 'framer-motion';
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "../models/contentful.server";
//import {FaGithub, FaLinkedin, FaTwitter, FaTwitch, FaYoutube} from 'react-icons/fa';
import { MetaFunction } from "@remix-run/node";

export async function loader(){
	return json(await client.getPage("Corgi"))
}

export const meta = ({data}) => {
	const {seoMetadata} = data;
	return {
		title: seoMetadata.title,
		description: seoMetadata.description,
		"og:image": `${seoMetadata.ogImage.url}`
	}
}

export default function Index() {
	const {title, rolesCollection, linksCollection } = useLoaderData();
	const links ={} 
	linksCollection.items.forEach(link => {
		Object.assign(links,Object.fromEntries([Object.values(link)]))
	});
  return (
				<div className="text-center mt-24 sm:mt-24 dark:text-white">
					<div>
						<h1 className="text-3xl sm:text-6xl">
						Hello{' '}
							<motion.div animate={{
									rotate: [0, 5, 0, -5, 0]
								}}
								transition={{
									duration: 0.5,
									ease: "easeInOut",
									loop: "Infinity",
									repeatDelay: 2
								}}
								className="inline-block"
							>
								<span role="img" aria-label="wave">
									👋
								</span>
							</motion.div>
							, I'm <span className="text-primary dark:text-secondary"> {title}</span>!
						</h1>
					</div>
					<div className="mt-8">
						<TextLoop>
							{rolesCollection.items.map(role => (
								<h1 className="text-2xl sm:text-4xl w-48" key={role.roleTitle}>
									{role.roleTitle}
								</h1>
							))}
						</TextLoop>
					</div>
					<div className="mt-8 sm:mt-16 flex justify-between sm:mx-64 mx-12 dark:text-secondary">
					</div>
				</div>
  );
}
