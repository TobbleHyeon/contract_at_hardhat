import reactLogo from "./assets/react.svg";
import metaMaskLogo from "./assets/MetaMask_Fox.png";
import "./App.scss";

export default function App() {
    return (
        <>
            <div className='flex justify-center'>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={metaMaskLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Metamask & React 연결</h1>
            <div className='card'>
                <button>count is </button>
            </div>
        </>
    );
}
