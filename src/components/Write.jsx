import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

// 환경변수 불러오기
const API_URL = import.meta.env.VITE_API_URL;

export default function Write({ isModifyMode, boardId, handleCancel }) {
  let navigate = useNavigate();
  const [content, setContent] = useState({
    name: "",
    title: "",
    content: "",
    image: null,
  });

  // 기존 이미지 삭제 여부
  const [removeImage, setRemoveImage] = useState(false);

  // 서버에 데이터 요청
  useEffect(() => {
    if (isModifyMode && boardId) {
      axios
        .get(`${API_URL}/view?id=${boardId}`)
        .then(response => {
          console.log(response.data); //[{..}]
          //setContent(response.data);

          // data가 없거나 data 배열의 개수가 0이라면
          if (!response.data || response.data.length === 0) {
            setIsError(true);
            // console.log(isError);
            return;
          }

          const data = response.data[0];

          setContent({
            name: data.writer,
            title: data.title,
            content: data.content,
            date: data.date,
            image_path: data.image_path || "", // 기존 이미지
            image: null, // 새 이미지
          });
        })
        .catch(error => {
          console.error(error);
          setIsError(true);
        })
        .finally(() => {
          console.log("요청완료");
        });
    }
  }, []);

  // trim해서 빈칸 검사하고 trim된 값 반환하는 함수
  const validate = e => {
    const name = e.target.name.value.trim();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();

    if (!name || !title || !content) {
      alert("모든 내용을 작성해주세요");
      return null;
    }

    return { name, title, content };
  };

  const createFormData = (validatedData, id) => {
    const formData = new FormData();
    formData.append("writer", validatedData.name);
    formData.append("title", validatedData.title);
    formData.append("content", validatedData.content);
    if (id) {
      formData.append("id", id);
    }

    // 새 이미지
    if (content.image) {
      formData.append("image", content.image);
    }
    // removeImage가 true면 기존 이미지 제거
    if (removeImage) {
      formData.append("remove_image", "1");
    }

    return formData;
  };

  // 글 작성 : 서버에 현재 폼 입력값 데이터 전송
  const write = e => {
    e.preventDefault();

    // 검사해서 없으면 취소
    const validatedData = validate(e);
    if (!validatedData) return;

    const formData = createFormData(validatedData);

    axios
      .post(`${API_URL}/write`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(response => {
        console.log(response.data);
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
        console.log(e.target.name.value);
        console.log(e.target.title.value);
        console.log(e.target.content.value);
      });
  };

  // 글 수정 : 서버에 현재 폼 입력값 데이터 전송
  const update = e => {
    e.preventDefault();

    // 검사해서 없으면 취소
    const validatedData = validate(e);
    console.log(validatedData);

    if (!validatedData) return;

    const formData = createFormData(validatedData, boardId);

    axios
      .post(`${API_URL}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        handleCancel();
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
        console.log(e.target.name.value);
        console.log(e.target.title.value);
        console.log(e.target.content.value);
      });
  };

  const handleClick = () => {
    handleCancel();
    navigate("/");
  };

  const handleImageChange = e => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    setContent(prev => ({
      ...prev,
      image: file,
    }));
  };

  return (
    <>
      <h2 className="mb-3">{isModifyMode ? "글수정" : "글쓰기"}</h2>

      <Form onSubmit={isModifyMode ? update : write}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            defaultValue={content.name}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            defaultValue={content.title}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows={3}
            defaultValue={content.content}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>이미지 첨부</Form.Label>
          <Form.Control
            type="file"
            // name="attachment"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        {content.image_path && (
          <div>
            <img
              src={`${API_URL}/${content.image_path}`}
              alt={content.title}
              style={{ maxWidth: "200px" }}
            />
            <Form.Check // prettier-ignore
              type="checkbox"
              id={`default-check`}
              label="기존 이미지 제거"
              onChange={e => {
                setRemoveImage(e.target.checked);
              }}
            />
          </div>
        )}

        <div className="d-flex gap-1 justify-content-end">
          <Button type="submit" variant="primary">
            입력
          </Button>
          <Button variant="secondary" onClick={handleClick}>
            취소
          </Button>
        </div>
      </Form>
    </>
  );
}
