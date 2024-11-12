export const countMemberTypes = (members: any, types: any, typeJumlah?: any) =>{
    let setup = 0;
    if(typeJumlah == 'kamar'){
        console.log('member', types, members)
        // members.forEach((member: any) => {
        //     switch (member?.room_type) {
        //         case types:
        //             setup++;
        //             break;
        //     }
        // });
    } else {
        members.forEach((member: any) => {
            switch (member.type) {
                case types:
                    setup++;
                    break;
            }
        });
    }

    return setup ;
}