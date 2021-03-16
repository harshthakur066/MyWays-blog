import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Comment, Form, Icon, Label } from "semantic-ui-react";

import myWays from "../../assets/myWays.png";

const BlogDetail = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  const getBlog = async (id) => {
    try {
      const blog = await axios.get(`api/v1/blog/${id}`);
      setBlog(blog.data);
    } catch (e) {
      console.error(e);
    }
  };

  const formSubmit = async (body) => {
    try {
      await axios.post(`/api/v1/blog/${id}/comment`, body);
      alert("Comment added!");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (comment === "") return;
    const userForm = {
      comment: comment,
    };
    console.log(userForm);
    formSubmit(userForm);
  };

  useEffect(() => {
    getBlog(id);
  }, [id]);

  const renderContent = () => {
    switch (blog) {
      case null:
        return <h4>Loading...</h4>;
      default:
        return (
          <div className="all">
            <div className="pic">
              <img width="800px" height="400px" src={blog.image} alt="pic" />
            </div>
            <div className="section">
              <div className="section">
                <img src={myWays} alt="myWays" />
                <h3>MyWays</h3>
              </div>
              <h5 style={{ marginTop: "2.5rem" }}>Mar 02, 2021 - 8 min Read</h5>
              <div style={{ marginTop: "1rem" }}>
                <Button primary>Share</Button>
              </div>
            </div>
            <h1>Introduction</h1>
            <h6>{blog.content}</h6>
            <div>
              <h2 style={{ marginTop: "6rem" }}>Comments</h2>
              <Comment.Group>{renderComments()}</Comment.Group>
              <Form onSubmit={onSubmit} reply>
                <Form.TextArea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  color="teal darken-3"
                  required={true}
                />
              </Form>
              <Button as="div" labelPosition="right">
                <Button color="red">
                  <Icon name="heart" />
                  Like
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  164
                </Label>
              </Button>
            </div>
          </div>
        );
    }
  };

  const renderComments = () => {
    switch (blog.comments.length) {
      case 0:
        return <h4>There are no comments</h4>;

      default:
        return blog.comments.map((comment) => {
          return (
            <div className="view" key={comment._id}>
              <Comment>
                <Comment.Content>
                  <Comment.Author as="a">Harsh</Comment.Author>
                  <Comment.Text> {comment} </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </div>
          );
        });
    }
  };

  return <div>{renderContent()}</div>;
};

export default BlogDetail;
