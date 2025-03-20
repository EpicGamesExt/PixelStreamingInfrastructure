// Copyright Epic Games, Inc. All Rights Reserved.

'use strict'

module.exports = {
    rules: {
        "copyright": {
            meta: {
                fixable: 'code',
                defaultOptions: [{
                    notice: ""
                }],
                schema: [{
                    type: "object",
                    properties: {
                        notice: {
                            type: "string"
                        }
                    },
                    additionalProperties: false
                }]
            },
            create(context) {
                const { options } = context;

                if (!options.length) {
                    throw new Error('missing options')
                }

                if (!options[0].notice) {
                    throw new Error('missing notice option')
                }

                const notice = options[0].notice;
                return {
                    Program: function (node) {
                        if (notice === "") {
                            return;
                        }

                        let comments = context.sourceCode.getAllComments();
                        const foundIndex = comments.findIndex((comment) => comment.value.trim() === notice);
                        if (foundIndex >= 0) {
                            // There's a copyright notice in this file. Make sure it's at the top
                            if (comments[foundIndex].loc.start.line != 1) {
                                context.report({
                                    node,
                                    message: 'Copyright notice is not at the top of file!',
                                    fix: (fixer) => {
                                        return [
                                            fixer.remove(comments[foundIndex]), // Remove the existing comment
                                            fixer.insertTextBeforeRange([0, 1], `// ${notice}\n`) // Insert a new header at the top of the file
                                        ];
                                    }
                                });
                            }
                        } else {
                            context.report({
                                node,
                                message: 'Missing copyright notice!',
                                fix: (fixer) => {
                                    return fixer.insertTextBeforeRange([0, 1], `// ${notice}\n`) // Insert a new header at the top of the file
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}