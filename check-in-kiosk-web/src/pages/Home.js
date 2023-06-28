import { useEffect, useState } from "react";
import { RequestsService } from "../services/requests_service";

const validate = (email) => {
    const parts = email.split("@");
    if (parts.length !== 2) {
        return false;
    }
    const domains = parts[1].split(".");
    return domains[domains.length - 1] === "edu";
}


function Home() {
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        if (!validate(formJson.email)) {
            setResult("Invalid email format");
            return;
        }
        try {
            await RequestsService.post("/students", formJson);
            setResult("Check in done")
        }
        catch (err) {
            setResult("Check in failed");
            console.log("Check in failed", err);
        }
    }

    const [majors, setMajors] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await RequestsService.getExternal("https://ios-interview.joinhandshake-internal.com/majors");
                const majors = res.data.majors.map(major => major.name);
                setMajors(majors);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const renderOptions = () => {
        return majors.map((major) => {
            return <option value={major}>{major}</option>
        })
    }

    return (
        <form className="checkInForm" method="post" onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" name="first_name"></input>
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name"></input>
            </label>
            <label>
                Email:
                <input type="text" name="email"></input>
            </label>
            <label>
                Major:
            <select name="major">
                {renderOptions()}
            </select>
            </label>
            <hr />
            <button type="submit">Submit</button>
            <hr />
            <p>{result}</p>
        </form>
    );

}

export default Home;