import React from "react";

interface DataProps {
  data: {
    createdAt: string;
  creator: string;
  id: string;
  message: string;
  title: string;
  }
}

const Item: React.FC<DataProps> = ({data}) => {
  console.log(data);
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default Item;
