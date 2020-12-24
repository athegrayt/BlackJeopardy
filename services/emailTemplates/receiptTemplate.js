const keys = require('../../config/keys')

module.exports = (survey) => {
	const { body } = survey;
	return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>Thank you for your support!</h3>
                <p>Please answer the following question</p>
                <p>${body}</p>
            <div>
                <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
            </div>
            <div>
                <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
            </div>
            </div>
        </body>
    </html>
    `;
};
