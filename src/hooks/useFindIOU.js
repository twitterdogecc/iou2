import React, {useEffect, useState, useCallback, useContext} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
import Web3 from 'web3';
import TokensListContext from '../context/TokensListContext';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;




export default function useFindIOU() {
    
    const { drizzle } = useDrizzle() ;
    const drizzleState = useDrizzleState(state => state);
    const [IOUAddreses, setIOUAddreses] = useState();
    const [IOUList, setIOUList] = useState();
    const { StoreIOUs, ProxyIOU } = drizzleState.contracts;

    const tokenList = useContext(TokensListContext)
    const [values, setFormValues] = useState(tokenList.values) 


        const changeIOUListAddreses = useCallback((addressList) => {
            setIOUAddreses(addressList);
        }, [setIOUAddreses]);
    
    
       const changeIOUList = useCallback(
            (listItem) => {
                setIOUList(listItem)
            },
            [setIOUList],
        );

        useEffect( 
            () => {
                const storeIOU = drizzle.contracts.StoreIOUs
            if (values.searchStreet) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.asciiToHex(values.keyword), values.country, values.state, values.city, values.street);
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
                if (result !== undefined) {
                    changeIOUListAddreses(result.value);
                }
                }
            } else if (values.searchLocation) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.asciiToHex(values.keyword), values.country, values.state, values.city);
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
                if (result !== undefined) {
                    changeIOUListAddreses(result.value);
                }
                }
            } else {
                const getIOUsTrx = storeIOU.methods["getIOUListKey"].cacheCall( Web3.utils.asciiToHex(values.keyword));
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUListKey[getIOUsTrx];
                if (result !== undefined) {
                    changeIOUListAddreses(result.value);
                }
                }
            }}, [changeIOUListAddreses, drizzleState, drizzle, StoreIOUs, values]);
     
    /* 
          const findIOU = (values) => {
                const storeIOU = drizzle.contracts.StoreIOUs
            if (values.searchStreet) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.asciiToHex(values.keyword), values.country, values.state, values.city, values.street);
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
                if (result !== undefined) {
                  //  changeIOUListAddreses( result.value);
                  return  result.value;
                }
                }
            } else if (values.searchLocation) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.asciiToHex(values.keyword), values.country, values.state, values.city);
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
                if (result !== undefined) {
                 //   changeIOUListAddreses( result.value);               
                 return  result.value;

                 }
                }
            } else {
                const getIOUsTrx = storeIOU.methods["getIOUListKey"].cacheCall( Web3.utils.asciiToHex(values.keyword), {from: drizzleState.accounts[0]});
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUListKey[getIOUsTrx];
                if (result !== undefined) {
                  //  changeIOUListAddreses( result.value);              
                  return  result.value;

                  }
                }
            }
        } */
             useEffect( 
                () => {
                    const proxyIOU = drizzle.contracts.ProxyIOU
                    
                    if(IOUAddreses !== undefined && IOUAddreses != null) {
                        const IOUListObjects = []
                        for(var i=0; i<IOUAddreses.length; i++) {
                            const resultTrx = proxyIOU.methods["getIOU"].cacheCall(IOUAddreses[i]);
                            if (resultTrx !== undefined) {
                                const resultItem = ProxyIOU.getIOU[resultTrx]
                                if (resultItem !== undefined) {
                                    let keys = resultItem.value.description.keywords.map((value,key) => {
                                        return drizzle.web3.utils.hexToAscii(value)
                                    })
                                    IOUListObjects.push( {
                                            id: i,
                                            title: resultItem.value.name,
                                            count: i,
                                            description: resultItem.value.description.description,
                                            keys: keys.join(','),
                                            address: IOUAddreses[i],
                                            minted: drizzle.web3.utils.fromWei(resultItem.value.description.totalMinted),
                                            payed: drizzle.web3.utils.fromWei(resultItem.value.description.totalBurned),
                                            rating: resultItem.value.description.avRate,
                                            units: drizzle.web3.utils.hexToAscii(resultItem.value.description.units),
                                            location: (resultItem.value.description.location),
                                            phone: drizzle.web3.utils.hexToAscii(resultItem.value.description.phone)
                                        })    
                                   
                                    
                                    // avRate: "0"
                                    // description: "test"
                                    // issuer: "0x8D67716DE05d313911A957077B91730D2C7e7c70"
                                    // keywords: []
                                    // location: "Eldorado "
                                    // myName: "test"
                                    // socialProfile: "test"
                                    // totalBurned: "0"
                                    // totalMinted: "0"
                                    // units: "0x686f757273000000000000000000000000000000000000000000000000000000"
                                    // avRate: "0"
                                    // description: "test"
                                    // issuer: "0x8D67716DE05d313911A957077B91730D2C7e7c70"
                                    // keywords: []
                                    // location: "Eldorado "
                                    // myName: "test"
                                    // socialProfile: "test"
                                    // totalBurned: "0"
                                    // totalMinted: "0"
                                    // units: "0x686f757273000000000000000000000000000000000000000000000000000000"
                                    // length: 10
                                    // name: "test"
                                    // symbol: "tt"
                                    console.log(resultItem)    
                                }
                            }
                        }
                        changeIOUList(IOUListObjects)
                    }    
                    
                }, [changeIOUList,IOUAddreses, drizzle, ProxyIOU])
         
    

    return [ IOUList]
// IOUList, IOUAddreses, 
}