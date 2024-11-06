// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { supabase } from '../../../utils/supabase';
import { useEffect, useState } from 'react';
import Loadig from '../../components/Loading';




// const statuses = {
//   Complete: 'text-green-700 bg-green-50 ring-green-600/20',
//   'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
//   Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
// }

  

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


// eslint-disable-next-line react/prop-types
export function SearchComponent({setSelectedColumns, getrecords, searchText, setSearchText, total}) {
    const [show, setShow] = useState(true);
    const searchIndexs= [
        {
          name: "Year",
          column: "year"
        },
        {
          name: "Volume",
          column: "volume"
        },
        {
          name: "Article Name",
          column: "article_name"
        },{
          name: "Link",
          column: "link"
        },
        {
          name: "Dynasty In Kannada",
          column: "dynasty_in_kannada"
        },
        {
          name: "Dynasty",
          column: "dynasty"
        },
        {
          name: "District In Kannada",
          column: "district_in_kannada"
        },
        {
          name: "District",
          column: "district"
        },
        {
          name: "Author Name",
          column: "authorname_in_english"
        },
        {
          name: "Author Name In Kannada",
          column: "author_in_kannada"
        },
        {
          name: "Subject",
          column: "subject"
        },
        {
          name: "Subject 2",
          column: ""
        },
        {
          name: "Subject In Kannada",
          column: "subject_in_kannada"
        },
        {
          name: "Subject 2 In Kannada",
          column: "Subject_2_in_kannada"
        },
        {
          name: "Time Period",
          column: "time_period"
        },
        {
          name: "Taluk",
          column: "taluk"
        },
        {
          name: "State",
          column: "state"
        },
        {
          name: "Description",
          column: "description"
        },
    ] 
    const handleCheckboxChange = (e) => {
      const { id, checked } = e.target;
  
      // Update the selected columns state based on the checkbox selection
      if (checked) {
        setSelectedColumns((prev) => [...prev, id]); // Add column to selected list
      } else {
        setSelectedColumns((prev) => prev.filter((col) => col !== id)); // Remove column from selected list
      }
    };
    
    const handleSearchTextChange = (e) => {
      setSearchText(e.target.value); // Update the search text state
    };
    return (
        <div className="">
          
            <div className="2xl:container 2xl:mx-auto">
                <div className=" md:py-12 lg:px-20 md:px-6 py-9 px-4">
                    <p className=" text-sm leading-3 text-gray-600 font-normal mb-2">Home - Filters</p>
                    <div className=" flex justify-between items-center mb-4">
                        <h2 className=" lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">ITIHASA&#39;s</h2>
                        {/* filters Button (md and plus Screen) */}
                        <button onClick={() => setShow(!show)} className=" cursor-pointer sm:flex hidden hover:bg-gray-700  focus:ring focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800  text-base leading-4 font-normal text-white justify-center items-center ">
                            <svg className=" mr-2" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Filters
                        </button>
                    </div>
                    <p className=" text-xl leading-5 text-gray-600 font-medium">{total}</p>
                    {/* Filters Button (Small Screen) */}
                    <button onClick={() => setShow(!show)} className=" cursor-pointer mt-6  sm:hidden hover:bg-gray-700  focus:ring focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center ">
                        <svg className=" mr-2" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Filters
                    </button>
                </div>
                <div className={`relative ${show ? "hidden" : ""}  lg:px-20 md:px-6 py-10 px-8 bg-gray-50 w-full lg:pb-48`}>
                    <div className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 lg:gap-y-0 md:gap-y-24 gap-y-14 ">
                        {/* Cross button Code */}
                        <div onClick={() => setShow(!show)} className="cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                            <svg className=" lg:w-6 lg:h-6 w-4 h-4" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 1L1 25" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 1L25 25" stroke="#27272A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                   
                        
                        {/* Material Section */}
                        <div className=" flex flex-col col-span-3 space-y-8 lg:justify-start lg:items-start md:justify-start md:items-center">
                            <div className=" flex flex-col space-y-8 justify-start items-start ">
                                <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">Search By</p>
                                <div className="grid grid-cols-3 w-full gap-8">
                                  {searchIndexs.map((searchindex)=>(<div key={searchindex.column} className=" flex w-full">
                                      <input onChange={handleCheckboxChange} className="w-4 h-4 mr-2" type="checkbox" id={searchindex.column} name={searchindex.column} defaultValue={searchindex.column} />
                                      <div className=" inline-block">
                                          <div className=" flex space-x-6 justify-center items-center">
                                              <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor={searchindex.column}>
                                                  {searchindex.name}
                                              </label>
                                          </div>
                                      </div>
                                  </div>))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchTextChange}
                        className="border w-full p-2 rounded"
                      />
                    </div>
                    {/* Apply Filter Button (Large Screen) */}
                    <div className=" hidden md:block absolute right-0 bottom-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                        <button onClick={()=>getrecords()} className="hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">
                            Apply Filter
                        </button>
                    </div>
                    {/* Apply Filter Button (Table or lower Screen) */}
                    <div className="block md:hidden w-full mt-16 ">
                        <button onClick={()=>getrecords()} className=" w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>
            <style>
                {`
            .checkbox:checked + .check-icon {
             display: flex;
            }
            `}
            </style>
        </div>
    );
}


export default function Home() {
  const [records, setRecords] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30); // Set default page size
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [searchText, setSearchText] = useState('');

  const buildQuery = async () => {
    let query = supabase.from('karnataka_itihasa_records').select('*',{count: "exact"}).range((page - 1) * pageSize, page * pageSize - 1); // Replace 'your_table_name' with your actual table name

    // If search text is provided, apply a LIKE filter to each selected column
    const numericColumns = ['year', 'volume'];
    if (searchText && selectedColumns.length > 0) {
      const conditions = selectedColumns.map((column) => {
        if (numericColumns.includes(column) && !isNaN(searchText)) {
          // For numeric columns, we do an equality comparison
          return `${column}.eq.${parseInt(searchText)}`;
        } else {
          // For text columns, we use ilike (case-insensitive match)
          return `${column}.ilike.%${searchText}%`;
        }
      });
  
      // Combine all conditions with an OR clause
      const orCondition = conditions.join(',');
  
      // Apply the OR condition to the query
      query = query.or(orCondition);
    }
    return query
  };


  const getrecords =  async () =>{
    const {data: records, error, count} = await  buildQuery();

    console.log(records, error, count);
    setRecords(records);
    setTotal(count)
    setTotalPages(Math.ceil(count / pageSize));
  }
  useEffect(()=>{
    getrecords();
  },[page])
  

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };



  return (
    <div className="px-20 py-10">
                <SearchComponent getrecords={getrecords} setSelectedColumns={setSelectedColumns} searchText={searchText} setSearchText={setSearchText} total={total} />
        {records?<ul role="list" className=" grid grid-cols-3 gap-4">

          {records?.map((record) => (
            <li key={record.id} className="flex flex-col border rounded-md border-gray-300 justify-between gap-x-6 p-4">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm/6 font-semibold text-gray-900">{record.article_name}</p>
                  <p className="text-sm/6 font-semibold text-gray-900">{record.article_name}</p>
                  {/* <p
                    className={classNames(
                      statuses[record.status],
                      'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                    )}
                  >
                    {record.status}
                  </p> */}
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                  {/* <p className="whitespace-nowrap">
                    Due on <time dateTime={record.dueDateTime}>{record.dueDate}</time>
                  </p> */}
                  {/* <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle r={1} cx={1} cy={1} />
                  </svg> */}
                  <p className="truncate">ವಿಷಯ: {record.subject_in_kannada}</p>
                  <p className="truncate">ಕಾಲಾವಧಿ: {record.time_period}</p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                  {/* <p className="whitespace-nowrap">
                    Due on <time dateTime={record.dueDateTime}>{record.dueDate}</time>
                  </p> */}
                  {/* <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle r={1} cx={1} cy={1} />
                  </svg> */}
                  <p className="truncate">Subject: {record.subject}</p>
                  <p className="truncate">Time Period: {record.time_period}</p>
                </div>
                <p className="truncate">ಲೇಖಕ: {record.author_in_kannada}</p>
                <p className="truncate">Author: {record.authorname_in_english}</p>
                
              </div>
              <div className="flex mt-auto justify-between items-center pt-4">
                <a
                  href={record.link}
                  target='_blank'
                  className="hidden rounded-md bg-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  View PDF<span className="sr-only">, {record.period}</span>
                </a>
                <a
                  className="hidden rounded-md bg-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  Details<span className="sr-only">, {record.period}</span>
                </a>
              </div>
            </li>
          ))}
          
        </ul>:<Loadig />}
        <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-gray-800 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 text-white bg-gray-800 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

    </div>
  )
}
