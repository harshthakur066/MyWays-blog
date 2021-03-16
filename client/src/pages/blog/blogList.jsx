import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import "./Blog.css";

const BlogList = () => {
  const history = useHistory();

  const [blogs, setBlogs] = useState(null);

  const getBlogs = async () => {
    try {
      const blogs = await axios.get("/api/v1/blog");
      setBlogs(blogs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const renderContent = () => {
    switch (blogs) {
      //   case 0:
      //     return <h2>Loading...</h2>;
      case null:
        return <h4>Loading...</h4>;
      default:
        return renderList();
    }
  };

  const renderList = () => {
    switch (blogs.length) {
      case 0:
        return <h3>There are no Blogs to show</h3>;

      default:
        // return ;
        return blogs.data.map((blog) => {
          console.log(blogs.data);
          return (
            <div style={{ margin: "2rem" }} className="view" key={blog._id}>
              <Card>
                <Image src={blog.image} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{blog.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">8 min</span>
                  </Card.Meta>
                  <Card.Description>{blog.summary}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    onClick={() => history.push(`/blog/detail/${blog._id}`)}
                  >
                    Details
                  </Button>
                </Card.Content>
              </Card>
            </div>
          );
        });
    }
  };

  return (
    <div className="blog-list">
      <Container>
        <h1>My Ways Blog</h1>
        <div className="lay">{renderContent()}</div>
      </Container>
    </div>
  );
};

export default BlogList;
