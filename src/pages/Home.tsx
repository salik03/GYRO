import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Select from "react-select";
import { ColourOption, colourOptions } from "../data";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import { Item, Location } from "../types/Location";
import DisplayMapClass from "./Map";
type LocationOption = {
  value: string;
  label: string;
};
function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useNavigate();
  const [filter, setFilter] = useState<string>("bennett univesity");
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>();
  const [selectedOption, setSelectedOption] = useState<LocationOption>();
  const debouncedFilter = useDebounce(filter, 500);
  const { data, isLoading } = useQuery(
    ["locations", debouncedFilter, filter],
    async () => {
      const res = await fetch(
        `https://geocode.search.hereapi.com/v1/geocode?apiKey=kI20g0fzIvUbWZCQo0eRgp1ReUSrVxmuTdzfo42KVAI&at=28.449473,77.581117&in=countryCode:IND&q=${filter}`
      );
      return (await res.json()) as Location;
    },

    {
      enabled: Boolean(debouncedFilter),
      onSuccess: (data) => {
        const arr: LocationOption[] = [];
        data.items.forEach((value: Item) => {
          arr.push({
            value: value.address.label,
            label: value.address.label,
          });
        });
        setLocationOptions(arr);
      },
    }
  );
  console.log({ data });
  //   useEffect(() => {
  //     return onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUser({
  //           name: user?.displayName,
  //           photourl: user.photoURL,
  //         });
  //       } else {
  //         setUser(null);
  //         router("/login");
  //       }
  //     });
  //   });
  // const filterColors = (inputValue: any) => {
  //   return colourOptions.filter((i: any) =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  // const loadOptions = (
  //   inputValue: string,
  //   callback: (options: ColourOption[]) => void
  // ) => {
  //   setTimeout(() => {
  //     callback(filterColors(inputValue));
  //   }, 1000);
  // };

  return (
    <Wrapper>
      <ActionItems>
        <DisplayMapClass />
        {/* {Headers} */}
        <Header>
          <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" />

          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage
              src={user && user.photourl}
              onClick={() => signOut(auth)}
            />
          </Profile>
        </Header>

        {/* {ActionButtons} */}
        <ActionButtons>
          <Link to="/search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>

          <Link to="/search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
              Wheels
            </ActionButton>
          </Link>

          <Link to="/search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
              Reserve
            </ActionButton>
          </Link>
        </ActionButtons>

        {/* {InputButton} */}

        {/* <SelectSearch
      options={[]}
      defaultValue="15997"
      getOptions={getOptions}
      search
      placeholder="Your favorite drink"
    /> */}
        {/* //@ts-ignore */}

        <Select
          defaultValue={locationOptions?.at(0) ?? { value: "", label: "" }}
          onChange={(value) => {
            if (value) {
              setSelectedOption(value);
            }
          }}
          onInputChange={(value) => {
            if (value) {
              setFilter(value);
            }
          }}
          isLoading={isLoading}
          isSearchable
          value={selectedOption}
          options={locationOptions}
          /*
      // @ts-ignore */
          //   loadOptions={loadOptions}
        />
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div<any>`
  flex flex-col h-screen
`;

const ActionItems = tw.div<any>`
	flex-1 p-4
`;

const Header = tw.div<any>`
	flex justify-between intems-center
`;

const UberLogo = tw.img`
	h-28
`;

const Profile = tw.div<any>`
	flex items-center
`;
const Name = tw.div<any>`
	mr-4 w-20 
`;

const UserImage = tw.img<any>`
	h-12 w-12 rounded-full border border-gray-200 p-px cursor-pointer

`;

const ActionButtons = tw.div<any>`
	
`;

const ActionButton = tw.div<any>`
	flex  bg-gray-200 s m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition text-xl cursor-pointer
`;

const ActionButtonImage = tw.img`
	h-3/5
`;

const InputButton = tw.div`
	h-15 bg-gray-200 text-xl p-4 flex items-center mt-8 mb-4
`;
export default Home;
