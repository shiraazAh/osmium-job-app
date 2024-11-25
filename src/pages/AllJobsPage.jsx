import { Card } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AllJobsPage() {
  return (
    <>
      <h3 className="text-white mt-3">Search & Land on your dream job</h3>
      <div className="d-flex justify-content-center mt-4">
        <Card className="shadow-sm" style={{ width: "100%", height: 200 }}>
          <p>Input 1</p>
          <p>Input 2</p>
          <p>Input 3</p>
          <p>Input 4</p>
        </Card>
      </div>
    </>
  );
}
