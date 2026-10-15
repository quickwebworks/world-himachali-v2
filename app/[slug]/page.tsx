import Website from '../../components/Website';
import {nav} from '../../lib/data';
import stories from '../../lib/stories.json';
import {notFound} from 'next/navigation';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(![...nav.map(n=>n[1]),...Object.keys(stories),'join-us-membership','api-guide'].includes(slug))notFound();return <Website page={slug}/>}
