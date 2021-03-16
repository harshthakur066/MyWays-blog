import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

const BlogPost = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "5rem",
        marginBottom: "5rem",
        fontSize: "bolder",
      }}
    >
      <h1>What do you wish to do?</h1>
      <div className="blog">
        <Card>
          <Image
            src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=641&q=80"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>Edit The Blog</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Link to="/blog/new"> Click To Continue </Link>
          </Card.Content>
        </Card>
        <Card>
          <Image
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=700&q=80"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>Write A New Blog</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Link to="/blog/new"> Click To Continue </Link>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;
