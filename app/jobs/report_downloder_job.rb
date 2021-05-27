# frozen_string_literal: true

class ReportDownloderJob < ApplicationJob
  queue_as :default

  def perform(report)
    p report
    generate_excel_report(report)
  end

  private

  def generate_excel_report(report)
    Axlsx::Package.new do |xlxs_package|
      xlxs_package.workbook.add_worksheet(name: 'Report') do |sheet|
        sheet.add_row ['Quiz name', 'User name', 'email', 'Correct answer', 'Incorrect Answers']
        report.map do |data|
          sheet.add_row [data[:quiz_name], data[:user_name], data[:email], data[:correct_answers],
                         data[:incorrect_answers]]
        end
      end
      xlxs_package.use_shared_strings = true
      xlxs_package.serialize('public/report.xlsx')
    end
  end
end
