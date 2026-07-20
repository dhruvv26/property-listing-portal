"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";

import { getUsers } from "../../../services/admin.service";

export default function UsersPage() {

    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        fetchUsers();
    },[]);

    const fetchUsers=async()=>{

        try{

            const res=await getUsers();

            setUsers(res.data.users);

        }

        catch(err:any){

            toast.error(err.response?.data?.message);

        }

        finally{

            setLoading(false);

        }

    };

    if(loading) return <Loader/>;

    return(

        <>

        <Navbar/>

        <div className="flex">

        <Sidebar/>

        <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">

        All Users

        </h1>

        <table className="w-full bg-white">

        <thead>

        <tr>

        <th>Name</th>
        <th>Email</th>
        <th>Role</th>

        </tr>

        </thead>

        <tbody>

        {users.map((user:any)=>(

        <tr key={user._id}>

        <td>{user.name}</td>

        <td>{user.email}</td>

        <td>{user.role}</td>

        </tr>

        ))}

        </tbody>

        </table>

        </main>

        </div>

        </>

    );

}