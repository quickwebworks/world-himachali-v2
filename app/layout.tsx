import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'World Himachali 2.0 | Rooted in Nature. United in Purpose.',description:'A global Himachali community working for culture, education, environmental care and shared opportunity.',icons:{icon:'/images/logo.jpg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
