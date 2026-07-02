import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Write() {
  return (
    <>
      {/* 입력폼 */}
      <Form>
        <Form.Group className="mb-3" controlId="name" name="name">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control type="text" placeholder="이름을 입력해주세요" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="title" name="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="제목을 입력해주세요" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="content" name="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>

      {/* 버튼 */}
      <div className="d-flex gap-3 justify-content-end">
        <Button variant="primary">입력</Button>
        <Button variant="secondary">수정</Button>
      </div>
    </>
  );
}
