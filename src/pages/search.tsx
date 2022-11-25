// @ts-nocheck
import { useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";

const Search = () => {
	const [pickup, setPickup] = useState("");
	const [dropoff, setDropoff] = useState("");

	console.log(pickup);
	console.log(dropoff);

	return (
		<Wrapper>
			{/* {"Button container"}
			<a href="/">
				<ButtonContainer>
					<BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
				</ButtonContainer>
			</a> */}

            <br/>

			<b>{"Enter pickup and destinantion."}</b>
            <br/>
            <br/>
			<InputContainer>
				<FromToIcons>
					<Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
					<Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
					<Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
				</FromToIcons>

				<InputBoxes>
					<Input
						placeholder="Enter pickup location"
						value={pickup}
						onChange={(e) => setPickup(e.target.value)}
					/>

					<Input
						placeholder="Where to?"
						value={dropoff}
						onChange={(e) => setDropoff(e.target.value)}
					/>
				</InputBoxes>

				<PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png" />
			</InputContainer>

			<b>{"Saved Places"}</b>
			<SavedPlaces>
				<StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
				<b>Saved Places</b>
			</SavedPlaces><br/>

			<b>{"Click Here to confirm location"}</b>
            <br/>
			<a
				href={{
					pathname: "/confirm",
					query: {
						pickup: pickup,
						dropoff: dropoff,
					},
				}}
			>
                <br/>
				<ConfirmLocation><center><b>Confirm Location</b></center></ConfirmLocation>
			</a>
		</Wrapper>
	);
};

export default Search;

const Wrapper = tw.div`
    bg-gray-200 h-screen
`;

// const ButtonContainer = tw.div`
//     bg-white px-4
// `;

// const BackButton = tw.img`
//     h-10 cursor-pointer
// `;

const InputContainer = tw.div`
    bg-black flex items-center px-4
`;

const FromToIcons = tw.div`
    w-10 flex flex-col items-center mr-2
`;

const Circle = tw.img`
    h-2.5
`;

const Line = tw.img`
    h-10
`;

const Square = tw.img`
    h-3
`;

const InputBoxes = tw.div`
    flex flex-col flex-1
    //bg-transparent hover:bg-Black-500 text-blue-400 font-bold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded
`;

const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-5 p-2 outline-none border-none
    //bg-transparent hover:bg-Black-500 text-blue-400 font-bold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded
`;

const PlusIcon = tw.img`
    w-10 h-10 bg-gray-200 rounded-full ml-3
`;

const SavedPlaces = tw.div`
    flex items-center bg-white px-4 mt-2 py-2
`;

const StarIcon = tw.img`
    bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
`;

const ConfirmLocation = tw.div`
    bg-transparent hover:bg-purple-500 text-blue-400 font-bold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded
`;
