const INITIAL_STATE = {
  // Dados fictícios
  data: {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      taxDocumentNumber: "",
      gender: "",
      addressStreet: "",
      addressZipcode: "",
      addressState: "",
      addressNumber: "",
      addressCity: "",
      addressComplement: "",
      dob: "",
      cellphoneNumber: "",
      race: "",
      profession: "",
      bankNumber: "",
      bankAgencyNumber: "",
      bankAccountType: "",
      bankAccountNumber: "",
    },
    project: {
      id: "",
      name: "",
      description: "",
      businesstime: "",
      documentResponsible: "",
    },
  },
};

export default function contract(state = INITIAL_STATE, action) {
  if (action.type === "FETCH_CONTRACT") {
    return { ...state, data: action.data };
  }
  return state;
}
