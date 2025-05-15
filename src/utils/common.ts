import { Response } from "express";
import { ApiResponse } from "../types";

const sendResponse = (res: Response, status: number, message: string, result: any = null): void => {
    const response: Partial<ApiResponse> = {
        success: status < 400,
        message: message,
        data: result,
        error: null
    } as ApiResponse;
    if (status >= 400) {
        response.success = false;
        response.error = result;
        response.message = "Internal server error";
    } else {
        response.success = true;
        response.data = result;
        response.message = "Successfully completed operations";
    }

    if (message) {
        response.message = message;
    }
    res.status(status).send(response);
};

export default sendResponse;