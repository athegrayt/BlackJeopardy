const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateEmails = (emails) => {
    const invalidEmails = emails
        .split(',')
        .map(emails => emails.trim())
        .filter(email => {
          return (re.test(email) || email[email.length-1]=== ',' || email === "") === false 
        })

    if (invalidEmails.length && invalidEmails !== '') {
			return `These emails are invalid: ${invalidEmails}`;
		}

    return 
}

export default validateEmails