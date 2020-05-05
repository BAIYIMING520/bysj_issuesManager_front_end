import service from '../utils/request';


export const fetchData = query => {
    return service({
        url: '/getdata/gettables',
        method: 'get',
        params:query
    });
};
//这里是用来做api请求的 分装了api的接口函数 比如说上面那个就是tables的接口 这里的request 请求是axios封装的接口 baseurl在 /utils/request中写了

export const DeleteData = query => {
    console.log('请求删除')
    return service({
        url: '/savedata/deletetables',
        method: 'get',
        params:query
    });
};

export const UpdateDate = query => {
    return service({
        url: '/savedata/savetables',
        method: 'post',
        params:query,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const fetchData_T2I = query => {
    return service({
        url: '/getdata/tableToIssues',
        method: 'post',
        headers:{'Content-Type':'application/json; charset=utf-8'},
        //headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data:query,
        transformRequest: [
            function (data) {
            // 先转换querypara 
            var temple=data
            var paraTemple=data.querypara
            paraTemple=JSON.stringify(paraTemple)    
            temple.querypara =paraTemple;
            return JSON.stringify(temple); 
        }]
    });
};

export const fetchData_I = query =>{
    return service({
            url: '/getdata/Issues',
            method: 'get',
            params:query
    })
};

export const fetchData_T = query =>{
    return service({
            url: '/getdata/Tags',
            method: 'get',
            params:query
    })
};

export const fetchData_Des = query =>{
    return service({
            url: '/getdata/Des',
            method: 'post',
            data:query,
            headers:{'Content-Type':'application/json; charset=utf-8'},
            transformRequest:[
                function (data){
                    return JSON.stringify(data);
                }
            ],
    })
};

export const fetchData_DesUname = query =>{
    return service({
            url: '/getdata/DesAndUname',
            method: 'post',
            data:query,
            headers:{'Content-Type':'application/json; charset=utf-8'},
            transformRequest:[
                function (data){
                    return JSON.stringify(data);
                }
            ],
    })
};

export const fetchData_Tags = query =>{
    return service({
        url: '/getdata/tableTag',
        method: 'post',
        data:query,
        headers:{'Content-Type':'application/json; charset=utf-8'},
        transformRequest:[
            function (data){
                return JSON.stringify(data);
            }
        ],
    })
}

export const saveDes = query => {
    return service({
        url: '/savedata/saveNewDes',
        method: 'post',
        data:query,
        headers:{'Content-Type':'application/json; charset=utf-8'},
        transformRequest:[
            function (data){
                return JSON.stringify(data);
            }
        ],
    })
}
