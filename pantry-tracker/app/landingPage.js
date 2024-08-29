// import * as React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import Link from "next/link";
// // import kitchen from "../src/kitchen.jpg";
// import { useRef, useEffect } from "react";

// function LandingPage() {
// 	let divElement = document.getElementById("divId");
// 	return (
// 		<Box
// 			display='flex'
// 			flexDirection='column'
// 			alignItems='center'
// 			justifyContent='center'
// 			minHeight='100vh'
// 			// backgroundImage={`url(https://images.pexels.com/photos/2039570/pexels-photo-2039570.jpeg)`}
// 			// backgroundSize='cover'
// 			// backgroundPosition='center'
// 			// opacity='0.5'
// 		>
// 			<Typography
// 				variant='h1'
// 				component='h1'
// 				gutterBottom
// 			>
// 				{" "}
// 				  Pantry Tracker
// 			</Typography>
// 			<Typography
// 				align='center'
// 				variant='h3'
// 			>
// 				Organize your pantry, reduce food waste, and save money.
// 			</Typography>
// 			{/* <Button variant="contained" color="primary" size="large" ref={buttonRef}>
//         Get Started
//       </Button> */}

// 			<Typography
// 				variant='h6'
// 				align='center'
// 				style={{ marginTop: "20px" }}
// 				fontSize='1.5rem'
// 				fontWeight='bold'
// 				color=''
// 				fontFamily='Arial'
// 				textAlign='center'
// 				padding='20px'
// 				backgroundColor='A4B5B1'
// 				borderRadius='10px'
// 				boxShadow='0 0 10px rgba(0, 0, 0, 0.1)'
// 				width='50%'
// 				margin='0 auto'
// 				maxWidth='800px'
// 			>
// 				Tired of tossing out expired food or making surprise trips to the store?
// 				Say hello to Pantry Tracker! Our app helps you take control of your
// 				kitchen by effortlessly managing your pantry inventory. Discover the joy
// 				of organized shelves, reduced food waste, and smarter shopping habits.
// 				Join the thousands who are already saving time and money with Pantry
// 				Tracker.
// 			</Typography>
// 			<Box></Box>
// 			{/* <Link href="/home">App</Link> */}

// 			<Button
// 				style={{
// 					color: "white",
// 					marginTop: "50px",
// 					fontSize: "25px",
// 					fontWeight: "bold",
// 					padding: "10px 20px",
// 					borderRadius: "10px",
// 					backgroundColor: "A4B5B1",
// 					border: "2px solid white",
// 				}}
// 				onClick={() => {
// 					{
// 						divElement.scrollIntoView({ behavior: "smooth" });
// 					}
// 					handleClose();
// 				}}
// 			>
// 				Start Here
// 			</Button>
// 		</Box>
// 	);
// }

// export default LandingPage;


'use client';
import { useState, useEffect } from "react";
// import LandingPage from "./landingPage";
import "./globals.css";
import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

import {
	Box,
	Stack,
	Typography,
	Button,
	Modal,
	TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	deleteDoc,
	getDoc,
} from "firebase/firestore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "white",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	gap: 3,
};

export default function LandingPage() {
	const [inventory, setInventory] = useState([]);
	const [open, setOpen] = useState(false);
	const [itemName, setItemName] = useState("");




	const updateInventory = async () => {
		const snapshot = query(collection(firestore, "inventory"));
		const docs = await getDocs(snapshot);
		const inventoryList = [];
		docs.forEach((doc) => {
			inventoryList.push({ name: doc.id, ...doc.data() });
		});
		setInventory(inventoryList);
	};

	useEffect(() => {
		updateInventory();
	}, []);

	const addItem = async (item) => {
		const docRef = doc(collection(firestore, "inventory"), item);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const { quantity } = docSnap.data();
			await setDoc(docRef, { quantity: quantity + 1 });
		} else {
			await setDoc(docRef, { quantity: 1 });
		}
		await updateInventory();
	};

	const removeItem = async (item) => {
		const docRef = doc(collection(firestore, "inventory"), item);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const { quantity } = docSnap.data();
			if (quantity === 1) {
				await deleteDoc(docRef);
			} else {
				await setDoc(docRef, { quantity: quantity - 1 });
			}
		}
		await updateInventory();
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div
			style={{
				backgroundColor: "white",
				height: "100vh",
				width: "100vw",
			}}
		>
			{/* <div className='backgroundImage'>
				<LandingPage />

			</div> */}
			<Box
				id='div'
				width='100vw'
				height='100vh'
				display={"flex"}
				justifyContent={"center"}
				flexDirection={"column"}
				alignItems={"center"}
				gap={2}
				className='backgroundImage1'
			>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
					className='backgroundImage1'
				>
					<Box sx={style}>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
						>
							Add Item
						</Typography>
						<Stack
							width='100%'
							direction={"row"}
							spacing={2}
						>
							<TextField
								id='outlined-basic'
								label='Item'
								variant='outlined'
								fullWidth
								value={itemName}
								onChange={(e) => setItemName(e.target.value)}
							/>
							<Button
								variant='outlined'
								onClick={() => {
									addItem(itemName);
									setItemName("");
									handleClose();
								}}
							>
								Add
							</Button>
						</Stack>
					</Box>
				</Modal>
				<Button
					variant='contained'
					onClick={handleOpen}
				>
					Add New Item
				</Button>
				<Box border={".5px solid #7D5328"}>
					<Box
						width='1000px'
						height='100px'
						// bgcolor={"#ADD8E6"}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						bgcolor={"#7D5328"}
					>
						<Typography
							variant={"h2"}
							color={"white"}
							textAlign={"center"}
						>
							Inventory Items
						</Typography>
					</Box>
					<Stack
						width='1000px'
						height='500px'
						spacing={2}
						overflow={"auto"}
					>
						{inventory.map(({ name, quantity }) => (
							<Box
								key={name}
								width='100%'
								minHeight='150px'
								display={"flex"}
								justifyContent={"space-between"}
								alignItems={"center"}
								bgcolor={"#f0f0f0"}
								paddingX={5}
							>
								<Typography
									variant={"h3"}
									color={"#333"}
									textAlign={"center"}
									style={{
										color: "white"
									}}
								>
									{name.charAt(0).toUpperCase() + name.slice(1)}
								</Typography>
								<Typography
									variant={"h3"}
									color={"#333"}
									textAlign={"center"}
									style={{
										color: "white"
									}}
								>
									{quantity}
								</Typography>
								<Button
									variant='contained'
									onClick={() => removeItem(name)}
								>
									Remove
								</Button>
							</Box>
						))}
					</Stack>
				</Box>
			</Box>
		</div>
	);
}
