import React, { useReducer } from "react";

const initialState = [
  { id: 1, name: "Student 1", status: "Not Marked" },
  { id: 2, name: "Student 2", status: "Not Marked" },
  { id: 3, name: "Student 3", status: "Not Marked" },
];

function reducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, status: "Present" }
          : student
      );

    case "MARK_ABSENT":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, status: "Absent" }
          : student
      );

    case "RESET":
      return state.map((student) => ({
        ...student,
        status: "Not Marked",
      }));

    default:
      return state;
  }
}

export default function AttendanceApp() {
  const [students, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Classroom Attendance App</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.status}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch({ type: "MARK_PRESENT", id: student.id })
                  }
                >
                  Present
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "MARK_ABSENT", id: student.id })
                  }
                  style={{ marginLeft: "10px" }}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => dispatch({ type: "RESET" })}
        style={{ marginTop: "20px" }}
      >
        Reset Attendance
      </button>
    </div>
  );
}
