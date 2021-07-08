import React, { useState } from "react";
import Button from "./Components/Button";
import MobileInputIcon from "./Components/InputIcon/mobile";
import DesktopInputIcon from "./Components/InputIcon/desktop";
import Input from "./Components/Input";
import { ReactComponent as CloseSvg } from "./assets/images-desktop/close.svg";
import { ReactComponent as SearchSvg } from "./assets/images-desktop/search.svg";
const App: React.FC = () => {
	const [value, setValue] = useState<string>("");
	const [value2, setValue2] = useState<string>("");
	const [value3, setValue3] = useState<string>("");
	const [value4, setValue4] = useState<string>("");

	return (
		<>
			<Button color="green">entrar</Button>
			<Button>sair</Button>
			{window.outerWidth > 899 ? (
				<>
					<DesktopInputIcon
						type="text"
						placeholder="nome"
						icon={CloseSvg}
						value={value}
						setValue={setValue}
					/>
					<DesktopInputIcon
						type="text"
						placeholder="buscar"
						icon={SearchSvg}
						action="search"
						color="white"
						value={value2}
						setValue={setValue2}
					/>
				</>
			) : (
				<>
					<MobileInputIcon
						type="text"
						placeholder="nome"
						icon={CloseSvg}
						value={value}
						setValue={setValue}
					/>
					<MobileInputIcon
						type="text"
						placeholder="buscar"
						icon={SearchSvg}
						action="search"
						color="white"
						value={value2}
						setValue={setValue2}
					/>
				</>
			)}
			<Input
				type="text"
				placeholder="buscar"
				color="green"
				value={value3}
				setValue={setValue3}
			/>
			<Input
				type="text"
				placeholder="buscar"
				color="white"
				value={value4}
				setValue={setValue4}
			/>
		</>
	);
};

export default App;
