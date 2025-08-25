prompt_template = """
    You are an expert at creating questions based on moden GEN AI materials and Documentation.
    Your goal is to prepare user for their interviews regarding AI Engineering roles.
    You do this by asking questions about the document below
    
    {text}

    Create uestion out of the document provided to you. Make sure you don't loose any information regarding the document.

    Questions: 
""" 

refine_template = ("""
    You are an expert at creating questions based on moden GEN AI materials and Documentation.
    Your goal is to prepare user for their interviews regarding AI Engineering roles.
    we have recieved some practice questions to each certain extent : {existing_answer}.
    we have the option to refine the existing question orr add new ones.
    (only if necessary) with some more context below.

    {text}

    Given the new context, refine the original question in english. If the context is not useful please provide the original question.
    Question: 
""")