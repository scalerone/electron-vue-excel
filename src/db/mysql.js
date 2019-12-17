const mysql = require('mysql')
import { MYSQL_CONF } from './db'


// let con = ''
// function handleDisconnection() {
//     con = mysql.createConnection(MYSQL_CONF)
//     con.connect(function (err) {
//         if (err) {
//             setTimeout('handleDisconnection()', 2000);
//         }
//     });
//
//     con.on('error', function (err) {
//         //logger.error('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//            // logger.error('db error执行重连:' + err.message);
//             handleDisconnection();
//         } else {
//             throw err;
//         }
//     });
//
// }
//
// // 统一执行 sql 的函数
// function exec(sql) {
//     handleDisconnection();
//     const promise = new Promise((resolve, reject) => {
//         con.query(sql, (err, result) => {
//             if (err) {
//                 reject(err)
//                 return
//             }
//             resolve(result)
//         })
//     })
//     return promise
// }


let pool = mysql.createPool(MYSQL_CONF);

const query=function(sql,options,callback){

    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,options,function(err,results,fields){
                //事件驱动回调
                callback(err,results,fields);
            });
            //释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
            conn.release();
        }
    });
};
// 统一执行 sql 的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}


export default {exec}

