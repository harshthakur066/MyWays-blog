import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";

import myWays from "../../assets/myWays.png";

const BlogDetail = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const getBlog = async (id) => {
    try {
      const blog = await axios.get(`api/v1/blog/${id}`);
      setBlog(blog.data);
    } catch (e) {
      console.error(e);
    }
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
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default BlogDetail;
