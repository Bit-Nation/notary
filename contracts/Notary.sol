pragma solidity ^0.4.23;

contract Notary {

    struct Record {
        bytes notarisedData;
        uint256 timestamp;
    }

    mapping(bytes32 => Record) public records;

    /**
    * @dev fetch a Record by it's data notarised data
    * @param _notarisedData the data that got notarised
    */
    function record(bytes _notarisedData) public constant returns(bytes, uint256) {
        Record memory r = records[keccak256(_notarisedData)];
        return (r.notarisedData, r.timestamp);
    }

    /**
    * @dev notarize a new record
    * @param _record the record to notarize
    */
    function notarize(bytes _record) public {

        // create hash of record to to have an unique and deterministic key
        bytes32 recordHash = keccak256(_record);

        // make sure the record hasn't been notarised
        require(records[recordHash].timestamp == 0);

        // notarize record
        records[recordHash] = Record({
            notarisedData: _record,
            timestamp: now
        });

    }

}

contract NotaryMulti {

    Notary public notary;

    constructor(Notary _notary) public {
        notary = _notary;
    }

    /**
    * @dev notarize two records
    * @param _firstRecord is the first record that should be notarized
    * @param _secondRecord is the second record that should be notarized
    */
    function notarizeTwo(bytes _firstRecord, bytes _secondRecord) public {
        notary.notarize(_firstRecord);
        notary.notarize(_secondRecord);
    }

}
