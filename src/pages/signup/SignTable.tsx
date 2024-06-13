
/* 
注册用户展示页
*/ 
import React, { useEffect,useState } from 'react';
import { Button,Popconfirm,Space,Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useNavigate } from "react-router-dom";
interface DataType {
    id: string;
  key: React.Key;
  nickname: string;
  phone: string;
  gender: string;
  password: string;
}



const SignupTable: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState< DataType[]>(JSON.parse(window.localStorage.getItem('signList')||'') || []);

    // 新增注册
const handleAdd = () => {
    console.log('注册用户');
    navigate("/SignupForm");
    
    }
   // 删除
    const handleDelete = (id:string) => {
        const newArr = data.filter(item => item.id !== id)
        setData(newArr)
        window.localStorage.setItem('signList',JSON.stringify(newArr))
    } 
    // 编辑
    const handleEdit = (id: string) => {
        navigate("/SignupForm?id=" + id);
    }
    // 列数据
    const columns: TableColumnsType<DataType> = [
  {
    title: '姓名',
    width: 80,
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    width: 80,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 80,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 40,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 60,
      render: (_, record) =>
      (
          <Space>
              <a onClick={()=>handleEdit(record.id)}>编辑</a>
               <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
         </Space>
        ) 
  },
];
return (
    <>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        注册用户
      </Button>
  <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />

    </>);
} 

export default SignupTable;
