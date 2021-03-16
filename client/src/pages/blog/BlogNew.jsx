import React, { useState } from "react";
import { Form, Message, Button, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const BlogNew = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const formSubmit = async (body) => {
    try {
      setErrorMsg("");
      await axios.post("/api/v1/blog", body);
      alert("Form Submitted");
      history.push("/");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userForm = {
      name: name,
      image: image,
      summary: summary,
      content: content,
    };
    formSubmit(userForm);
  };

  return (
    <div>
      <Container>
        <h3 style={{ margin: " 20px 0px" }}>Blog Editor</h3>
        <Form onSubmit={onSubmit} error={!!errorMsg}>
          <Form.Input
            fluid
            label="Name"
            placeholder="Your Title Here"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            fluid
            label="Image Link"
            placeholder="Place Your Image Link Here"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Form.Input
            fluid
            label="Description"
            placeholder="What Your Blog About?"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <Form.TextArea
            label="Content"
            placeholder="Add Content Here..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Message error header="Oops!" content={errorMsg} />
          <Form.Button floated="right" color="teal">
            Submit
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
};

export default BlogNew;
