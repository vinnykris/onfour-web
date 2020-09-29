// React Imports
import React, { useState } from "react";

// Styles Imports
import "./privacy_page.scss";

const TermsOfService = () => {
  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true); // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: "10px", behavior: "smooth" });
    setScroll(false);
  }
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header header-3">Terms of Service</div>
        <div className="header-4">1. Terms</div>
        <p className="body-1 policy-body">
          By accessing the website at{" "}
          <a href="https://onfour.live">https://onfour.live</a>, you are
          agreeing to be bound by these terms of service, all applicable laws
          and regulations, and agree that you are responsible for compliance
          with any applicable local laws. If you do not agree with any of these
          terms, you are prohibited from using or accessing this site. The
          materials contained in this website are protected by applicable
          copyright and trademark law.
        </p>
        <br></br>
        <div className="header-4">2. Use License</div>
        <ol type="a">
          <li className="body-1 policy-body">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on onfour's website for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
            <ol type="i" className="body-1 policy-body">
              <li className="body-1 policy-body">
                modify or copy the materials;
              </li>
              <li className="body-1 policy-body">
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li className="body-1 policy-body">
                attempt to decompile or reverse engineer any software contained
                on onfour's website;
              </li>
              <li className="body-1 policy-body">
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li className="body-1 policy-body">
                transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ol>
          </li>
          <li className="body-1 policy-body">
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by onfour at any time. Upon
            terminating your viewing of these materials or upon the termination
            of this license, you must destroy any downloaded materials in your
            possession whether in electronic or printed format.
          </li>
        </ol>
        <br></br>
        <div className="header-4">3. Disclaimer</div>
        <ol type="a">
          <li className="body-1 policy-body">
            The materials on onfour's website are provided on an 'as is' basis.
            onfour makes no warranties, expressed or implied, and hereby
            disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </li>
          <li className="body-1 policy-body">
            Further, onfour does not warrant or make any representations
            concerning the accuracy, likely results, or reliability of the use
            of the materials on its website or otherwise relating to such
            materials or on any sites linked to this site.
          </li>
        </ol>
        <br></br>
        <div className="header-4">4. Limitations</div>
        <p className="body-1 policy-body">
          In no event shall onfour or its suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit, or
          due to business interruption) arising out of the use or inability to
          use the materials on onfour's website, even if onfour or a onfour
          authorized representative has been notified orally or in writing of
          the possibility of such damage. Because some jurisdictions do not
          allow limitations on implied warranties, or limitations of liability
          for consequential or incidental damages, these limitations may not
          apply to you.
        </p>
        <br></br>
        <div className="header-4">5. Accuracy of materials</div>
        <p className="body-1 policy-body">
          The materials appearing on onfour's website could include technical,
          typographical, or photographic errors. onfour does not warrant that
          any of the materials on its website are accurate, complete or current.
          onfour may make changes to the materials contained on its website at
          any time without notice. However onfour does not make any commitment
          to update the materials.
        </p>
        <br></br>
        <div className="header-4">6. Links</div>
        <p className="body-1 policy-body">
          onfour has not reviewed all of the sites linked to its website and is
          not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by onfour of the
          site. Use of any such linked website is at the user's own risk.
        </p>
        <br></br>
        <div className="header-4">7. Modifications</div>
        <p className="body-1 policy-body">
          onfour may revise these terms of service for its website at any time
          without notice. By using this website you are agreeing to be bound by
          the then current version of these terms of service.
        </p>
        <br></br>
        <div className="header-4">8. Governing Law</div>
        <p className="body-1 policy-body">
          These terms and conditions are governed by and construed in accordance
          with the laws of New York and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>
        {/* <p><a href="https://getterms.io" title="Generate a free terms of use document">Terms of Use created with GetTerms.</a></p> */}
      </div>
    </div>
  );
};

export default TermsOfService;
