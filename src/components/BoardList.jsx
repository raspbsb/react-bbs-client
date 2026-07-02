import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function BoardList() {
  const simpleTest = () => {
    axios
      .get("http://localhost:3000/", {})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
      });
  };

  return (
    // 테이블
    <section>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Check
              // disabled
              // type={}
              // label={}
              // id={}
              />
            </td>
            <td>1</td>
            <td>안녕</td>
            <td>홍길동</td>
            <td>2026.07.02</td>
          </tr>
          <tr>
            <td>
              <Form.Check
              // disabled
              // type={}
              // label={}
              // id={}
              />
            </td>
            <td>2</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>2026.07.02</td>
          </tr>
        </tbody>
      </Table>

      {/* 버튼 */}
      <div className="d-flex gap-3 justify-content-end">
        <Button variant="primary" onClick={simpleTest}>
          입력
        </Button>
        <Button variant="secondary">수정</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </section>
  );
}
