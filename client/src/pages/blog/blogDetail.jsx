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
          <div>
            <div>
              {" "}
              <img src={blog.image} alt="pic" />{" "}
            </div>
            <div>
              <img src={myWays} alt="myWays" />
              <div>MyWays</div>
              <div>Mar 02, 2021 - 8 min Read</div>
              <Button primary>Share</Button>
            </div>
            <div>Introduction</div>
            <div>{blog.content}</div>
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default BlogDetail;
