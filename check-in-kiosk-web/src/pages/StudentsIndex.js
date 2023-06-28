import { useEffect, useState } from "react";
import { RequestsService } from "../services/requests_service";
import { Link } from "react-router-dom";

function StudentsIndex() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await RequestsService.get("/students");
                
                const studentsMap = res.data.reduce((map, current)=>{
                    if(!map[current.email]){
                        map[current.email] = [current]
                    }
                    else{
                        map[current.email].push(current);
                    }
                    return map;
                }, {})

                const studentsList = Object.keys(studentsMap).map(key=>{
                    studentsMap[key].sort((a, b)=>{
                        return new Date(b.check_in_time) - new Date(a.check_in_time);
                    })
                    const recent = studentsMap[key][0];
                    recent.check_ins_number = studentsMap[key].length
                    return recent;
                })

                setStudents(studentsList);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const renderUsers = () => {
        return students.map((student) => {
            return <tr key={student._id} >
                <td style={{ padding: '10px', border: '1px solid black' }}>{student.first_name}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{student.last_name}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{student.email}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{student.check_in_time}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{student.check_ins_number}</td>
            </tr>
        })
    }

    const renderHeader = () => {
        return <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Check In Time</th>
        </tr>
    }
    return <div>
        <div style={{ margin: '50px' }}>
            <h1>Students CheckIn Table</h1>
            <table>
                <thead>
                    {renderHeader()}
                </thead>
                <tbody>
                    {renderUsers()}
                </tbody>
            </table>
        </div>
        <Link to="/index/add">NewUser</Link>
    </div>
}

export default StudentsIndex;


