import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import {BsInstagram} from "react-icons/bs";
import {CiFacebook} from "react-icons/ci";
import {AiFillCopyrightCircle} from "react-icons/ai";

import logo from "../../images/white_logo.svg";
import { useEffect } from "react";

const navLinks = [
	{ name: "Artist", link: "/auth/login" },
	{ name: "User", link: "/user" },
	{ name: "Admin", link: "/auth/login" },
];

const companyLInks = ["About", "Jobs", "For the record"];

const communitiesLinks = [
	"For Artists",
	"Developers",
	"Advertising",
];

const usefulLInks = ["Support", "Web Player", "Free Mobile App"];

const footerLinks = [
	"privacy center",
	"privacy policy",
	"Cookies",
	"About ads"
];

const footerIcons = [<BsInstagram />, <CiFacebook />, <BsInstagram />];

const Welcome = () => {

	const navigate = useNavigate()

	useEffect(() => {
		const owner = Cookies.get("owner")
		if(owner === "admin"){
			navigate("/admin")
		}else if(owner === "artist"){
			navigate("/artist")
		}else if(owner==="user"){
			navigate("/user")
		}
	})
	
	const setLinkCookieData=(name)=>{
		Cookies.set("link",name)
	}

	return (
		<div className="w-full h-full">
			
			<header className="w-full h-[10%] bg-black flex items-center justify-between">
				<Link to="/">
					<img src={logo} alt="logo" style={{height:"35px"}} className="ml-10" />
				</Link>
				<div className="text-gray-300 font-semibold text-sm p-5">
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} onClick={()=>setLinkCookieData(link.name)} className="m-2 hover:text-white">
							{link.name}
						</Link>
					))}
				</div>
			</header>

			<main className="font-bold text-xl w-full h-[60%] bg-green-400 flex flex-col items-center justify-center">
				
					<div className="mb-5">Listening is everything</div>
					<div>Millions of songs and podcasts. No credit card needed.</div>					
			
			</main>

			<footer className="w-full h-[30%] bg-black">
				<div className="flex justify-around text-white">
				
					<div className="mt-5">
						<div className="font-semibold text-sm ml-1">Company</div>
						{companyLInks.map((link, index) => (
							<div key={index} className="p-1">
								{link}
							</div>
						))}
					</div>
					<div className="mt-5">
						<div className="font-semibold text-sm ml-1">Communities</div>
						{communitiesLinks.map((link, index) => (
							<div key={index} className="p-1">
								{link}
							</div>
						))}
					</div>
					<div className="mt-5">
						<div className="font-semibold text-sm ml-1">Useful links</div>
						{usefulLInks.map((link, index) => (
							<div key={index} className="p-1">
								{link}
							</div>
						))}
					</div>
					<div className="flex font-semibold text-sm ml-1 mt-5">
						{footerIcons.map((icon, index) => (
							<div key={index} className="p-1">
								{icon}
							</div>
						))}
					</div>
					<div className="mt-5">
						<div className="font-semibold text-sm ml-1">Policy</div>
						{footerLinks.map((link, index) => (
							<div key={index} className="p-1">
								{link}
							</div>
						))}
					</div>

				</div>
				<div className="text-white">
					<div className="flex justify-center items-center">
						<AiFillCopyrightCircle />
						<span>2023 Spotify</span>
					</div>
				</div>
			</footer>
			
		</div>
	);
};

export default Welcome;
