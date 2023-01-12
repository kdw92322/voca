export default function Header() {
    return (<div className="header">
        <h1>
            <a href="/">토익 영단어(고급)</a>
        </h1>
        <div className="menu">
            <button id="add_word">
                단어 추가
            </button>
            <button id="add_day">
                Day 추가
            </button>
        </div>
    </div>
    );
}