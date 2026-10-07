import Logo from "../assets/quiz-logo.png"
export default function Header() {
    return (<header className="p-8 content-center font-bold text-center flex-col justify-center items-center justify-items-center">
        <img src={Logo} alt="Quiz logo" className="w-20 h-20 m-5 justify-center align-middle" />
        <h1 className="flex justify-center m-3 size-20 text-4xl  text-black ">ReactQuiz</h1>
    </header>);
}